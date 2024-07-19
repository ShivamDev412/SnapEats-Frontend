import useDetails from "./useDetails";
import {
  BannerProfileSection,
  MenuItemsSection,
} from "@/components/Home/Details";
import { MenuCategories } from "@/components/Home/Details";
const Details = () => {
  const {
    storePrimaryDetails,
    isFetching,
    handleCategoryClick,
    categoryData,
    menuItems,
  } = useDetails();
  const {
    name,
    image,
    compressedImage,
    countryCode,
    phoneNumber,
    openTime,
    closeTime,
    travelTime,
    address,
    deliveryFee,
  } = storePrimaryDetails?.data || {};

  if (isFetching) return <p>Loading...</p>;
  return (
    <section>
      <BannerProfileSection
        name={name || ""}
        image={image || ""}
        countryCode={countryCode || ""}
        phoneNumber={phoneNumber || ""}
        compressedImage={compressedImage || ""}
        openTime={openTime || ""}
        closeTime={closeTime || ""}
        travelTime={travelTime || { min: 0, max: 0 }}
        address={address || ""}
        deliveryFee={deliveryFee || 0}
      />
      <MenuCategories
        categoryData={categoryData}
        handleCategoryClick={handleCategoryClick}
      />
      <MenuItemsSection
        menuItems={menuItems || []}
        openTime={openTime || ""}
        closeTime={closeTime || ""}
      />
    </section>
  );
};

export default Details;
