import { lazy, Suspense, useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Header from '../../components/userinterface/Header';
import FooterComponent from '../../components/userinterface/FooterComponent';
import { postData, getData } from '../../services/FetchNodeServices';

// Lazy load components
const SliderComponent = lazy(
  () => import('../../components/userinterface/SliderComponent'),
);
const BrandsSliderComponent = lazy(
  () => import('../../components/userinterface/BrandsSliderComponent'),
);
const CategoriesSliderComponent = lazy(
  () => import('../../components/userinterface/CategoriesSliderComponent'),
);
const ProductCard = lazy(
  () => import('../../components/userinterface/ProductCard'),
);
const ConcernSlider = lazy(
  () => import('../../components/userinterface/ConcernSlider'),
);

// Skeleton Components
const BannerSkeleton = () => (
  <div style={{ width: '95%', maxWidth: 1200, margin: '0 auto' }}>
    <Skeleton height={'min(400px, 50vh)'} borderRadius={15} />
  </div>
);

const SliderSkeleton = ({ count = 8 }) => (
  <div style={{ width: '95%', display: 'flex', gap: 15, overflow: 'hidden' }}>
    {[...Array(count)].map((_, i) => (
      <div key={i} style={{ flex: '0 0 auto', width: 120 }}>
        <Skeleton height={120} borderRadius={15} />
      </div>
    ))}
  </div>
);

const ProductsSkeleton = () => (
  <div
    style={{
      display: 'flex',
      gap: 20,
      width: '95%',
      overflow: 'hidden',
      margin: '0 auto',
    }}
  >
    {[...Array(6)].map((_, i) => (
      <div key={i} style={{ flex: '0 0 auto', width: 220 }}>
        <Skeleton height={250} borderRadius={10} />
        <Skeleton height={20} style={{ marginTop: 10 }} />
        <Skeleton height={20} width='60%' style={{ marginTop: 5 }} />
      </div>
    ))}
  </div>
);

export default function Home() {
  const [bannerList, setBannerList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [concernList, setConcernList] = useState([]);
  const [productListByOffer, setProductListByOffer] = useState([]);
  const [pageRefresh, setPageRefresh] = useState(false);

  // Loading states
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingConcerns, setLoadingConcerns] = useState(true);

  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchAllBanners = async () => {
    try {
      setLoadingBanners(true);
      const result = await postData('userinterface/show_all_banners', {
        bannertype: 'General',
      });
      setBannerList(result.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoadingBanners(false);
    }
  };

  const fetchAllBrands = async () => {
    try {
      setLoadingBrands(true);
      const result = await getData('userinterface/show_all_brands');
      setBrandList(result.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoadingBrands(false);
    }
  };

  const fetchAllCategory = async () => {
    try {
      setLoadingCategories(true);
      const result = await getData('userinterface/display_all_category');
      setCategoryList(result.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchAllProductDetails = async (offertype) => {
    try {
      setLoadingProducts(true);
      const result = await postData(
        'userinterface/display_all_product_details_by_offer',
        { offertype: offertype },
      );
      setProductListByOffer(result.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchAllConcerns = async () => {
    try {
      setLoadingConcerns(true);
      const result = await getData('userinterface/display_all_concerns');
      setConcernList(result.data);
    } catch (error) {
      console.error('Error fetching concerns:', error);
    } finally {
      setLoadingConcerns(false);
    }
  };

  useEffect(() => {
    fetchAllBanners();
    fetchAllBrands();
    fetchAllCategory();
    fetchAllProductDetails('deal of the day!');
    fetchAllConcerns();
  }, []);

  return (
    <div style={{ fontFamily: 'Kanit, sans-serif' }}>
      <Header />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Suspense fallback={<BannerSkeleton />}>
          {loadingBanners ? (
            <BannerSkeleton />
          ) : (
            <SliderComponent data={bannerList} />
          )}
        </Suspense>
      </div>

      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: 20,
          padding: 30,
        }}
      >
        <h3
          style={{
            fontSize: matchesMd ? '1.1rem' : '1.5rem',
            textAlign: 'start',
            marginLeft: 10,
          }}
        >
          Browse by brands
        </h3>

        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
        >
          <Suspense fallback={<SliderSkeleton count={matchesMd ? 6 : 11} />}>
            {loadingBrands ? (
              <SliderSkeleton count={matchesMd ? 6 : 11} />
            ) : (
              <BrandsSliderComponent data={brandList} />
            )}
          </Suspense>
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: 20,
          padding: 30,
        }}
      >
        <h1
          style={{
            fontSize: matchesMd ? '1.1rem' : '1.5rem',
            textAlign: 'start',
            marginLeft: 10,
          }}
        >
          Browse by category
        </h1>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
        >
          <Suspense fallback={<SliderSkeleton count={matchesMd ? 6 : 11} />}>
            {loadingCategories ? (
              <SliderSkeleton count={matchesMd ? 6 : 11} />
            ) : (
              <CategoriesSliderComponent data={categoryList} />
            )}
          </Suspense>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', padding: 30, gap: 1 }}>
        <Suspense fallback={<ProductsSkeleton />}>
          {loadingProducts ? (
            <ProductsSkeleton />
          ) : (
            <ProductCard
              pageRefresh={pageRefresh}
              setPageRefresh={setPageRefresh}
              title='Deal of the day!'
              data={productListByOffer}
            />
          )}
        </Suspense>
      </div>

      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: 20,
          padding: 30,
        }}
      >
        <h1
          style={{
            fontSize: matchesMd ? '1.1rem' : matchesSM ? '1.2rem' : '1.5rem',
            textAlign: 'start',
            marginLeft: 10,
          }}
        >
          Shop by concern
        </h1>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
        >
          <Suspense fallback={<SliderSkeleton count={matchesMd ? 6 : 11} />}>
            {loadingConcerns ? (
              <SliderSkeleton count={matchesMd ? 6 : 11} />
            ) : (
              <ConcernSlider data={concernList} />
            )}
          </Suspense>
        </div>
      </div>

      <FooterComponent />
    </div>
  );
}
