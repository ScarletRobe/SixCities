type PropertyImagesProps = {
  images: string[];
  propertyType: string;
}

function PropertyImages ({images, propertyType}: PropertyImagesProps) {
  return (
    <div className="property__gallery">
      {images.map((image) => (
        <div key={image} className="property__image-wrapper">
          <img className="property__image" src={image} alt={propertyType} />
        </div>
      ))}
    </div>
  );
}

export default PropertyImages;
