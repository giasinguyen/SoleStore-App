import PropTypes from 'prop-types';

const CustomerReviews = ({ reviews }) => {
  return (
    <div className="my-12">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Khách hàng nói gì về chúng tôi
        </h2>
        <p className="max-w-2xl text-gray-600">
          Đánh giá từ khách hàng là nguồn thông tin quý giá giúp chúng tôi cải thiện
          sản phẩm và dịch vụ của mình.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="review-card bg-white p-6 rounded-lg shadow-md border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img
                  src={
                    review.image ||
                    `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "women" : "men"
                    }/${Math.floor(Math.random() * 100)}.jpg`
                  }
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{review.name}</h4>
                <p className="text-sm text-gray-600">{review.location}</p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">{review.text}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
          Xem tất cả đánh giá
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

CustomerReviews.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default CustomerReviews;