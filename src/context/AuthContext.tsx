import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface UserData {
  username?: string;
  [key: string]: unknown;
}

const AuthContext = createContext(null);

// ─── LocalStorage Helpers ─────────────────────────────────────────────────────
const STORAGE_KEYS = {
  USER: 'user-data',
  CART: 'cart-products',
  ADMIN: 'ADMIN',
};

const safeParseJSON = (key, fallback = {}) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  // ── User State ──────────────────────────────────────────────────────────────
  const [user, setUserState] = useState(() => safeParseJSON(STORAGE_KEYS.USER, {}));

  // ── Admin State ─────────────────────────────────────────────────────────────
  const [admin, setAdminState] = useState(() => safeParseJSON(STORAGE_KEYS.ADMIN, null));

  // ── Cart State ──────────────────────────────────────────────────────────────
  const [cart, setCartState] = useState(() => safeParseJSON(STORAGE_KEYS.CART, {}));

  // ── Persist user to localStorage whenever it changes ────────────────────────
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  // ── Persist admin to localStorage whenever it changes ───────────────────────
  useEffect(() => {
    if (admin) {
      localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(admin));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN);
    }
  }, [admin]);

  // ── Persist cart to localStorage whenever it changes ────────────────────────
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // ── User Actions ────────────────────────────────────────────────────────────

  /** Login / register: save user details keyed by mobileno */
  const loginUser = useCallback((mobileno, userData) => {
    setUserState((prev) => ({ ...prev, [mobileno]: userData }));
  }, []);

  /** Logout: clear all user data */
  const logoutUser = useCallback(() => {
    setUserState({});
    localStorage.removeItem(STORAGE_KEYS.USER);
  }, []);

  // ── Admin Actions ───────────────────────────────────────────────────────────

  /** Admin login: save admin details */
  const loginAdmin = useCallback((adminData) => {
    setAdminState(adminData);
  }, []);

  /** Admin logout: clear admin data */
  const logoutAdmin = useCallback(() => {
    setAdminState(null);
    localStorage.removeItem(STORAGE_KEYS.ADMIN);
  }, []);

  // ── Cart Actions ────────────────────────────────────────────────────────────

  /** Add or update a product in the cart */
  const addToCart = useCallback((productdetailid, product) => {
    setCartState((prev) => ({ ...prev, [productdetailid]: product }));
  }, []);

  /** Remove a product from the cart */
  const removeFromCart = useCallback((productdetailid) => {
    setCartState((prev) => {
      const next = { ...prev };
      delete next[productdetailid];
      return next;
    });
  }, []);

  /** Clear the entire cart */
  const clearCart = useCallback(() => {
    setCartState({});
    localStorage.removeItem(STORAGE_KEYS.CART);
  }, []);

  // ── Derived Values ──────────────────────────────────────────────────────────

  /** First user entry (matches old `Object.values(user)[0]`) */
  const userData = (Object.values(user)[0] as UserData) || null;

  /** Short display name (first word of username) */
  const displayName = (() => {
    try {
      return userData?.username?.split(' ')[0] || '';
    } catch {
      return '';
    }
  })();

  /** Cart product keys (for badge count, etc.) */
  const cartKeys = Object.keys(cart);

  /** Cart product values */
  const cartItems = Object.values(cart);

  /** Cart item count */
  const cartCount = cartKeys.length;

  const value = {
    // user
    user,
    userData,
    displayName,
    loginUser,
    logoutUser,

    // admin
    admin,
    loginAdmin,
    logoutAdmin,

    // cart
    cart,
    cartKeys,
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return ctx;
}

export default AuthContext;
