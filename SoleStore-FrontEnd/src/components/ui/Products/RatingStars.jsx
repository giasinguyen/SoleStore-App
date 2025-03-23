const RatingStars = ({ rate }) => {
    const fullStars = Math.floor(rate); // Phần nguyên (ví dụ: 4)
    const hasHalfStar = rate % 1 !== 0; // Kiểm tra có phần thập phân không (ví dụ: 0.5)
    const stars = [];

    // Thêm sao đầy đủ
    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={`full-${i}`} style={{ color: '#ffd700', fontSize: '24px' }}>★</span>);
    }

    // Thêm nửa sao nếu có
    if (hasHalfStar) {
        stars.push(<span key="half" style={{ color: '#ffd700', fontSize: '24px' }}>½</span>);
    }

    // Thêm sao rỗng cho phần còn lại
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
        stars.push(<span key={`empty-${i}`} style={{ color: '#ccc', fontSize: '24px' }}>★</span>);
    }

    return <div>{stars}</div>;
};

export default RatingStars;