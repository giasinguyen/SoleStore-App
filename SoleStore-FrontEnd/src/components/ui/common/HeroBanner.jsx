import PropTypes from "prop-types";

const HeroBanner = ({
  imageUrl,
  title,
  description,
  buttonText = "Khám Phá Ngay",
  buttonLink = "#"
}) => {
  return (
    <div className="relative">
      <div className="w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent flex items-center">
          <div className="text-white p-6 md:p-16 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              {description}
            </p>
            <a
              href={buttonLink}
              className="inline-block bg-white text-gray-800 font-semibold px-6 py-2 rounded hover:bg-gray-200 transition-colors"
              style={{ textDecoration: "none" }}
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroBanner.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string
};

export default HeroBanner;