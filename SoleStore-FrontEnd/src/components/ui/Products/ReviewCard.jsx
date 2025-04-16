import React from 'react';

const ReviewCard = ({ review }) => {
    return (
        <div style={{ borderTop: '1px solid #eee', paddingTop: 20, marginTop: 20 }}>
            <div style={{ display: 'flex', gap: 10 }}>
                <img
                    src={review.image}
                    alt="avatar"
                    style={{ width: 40, height: 40, borderRadius: '50%' }}
                />
                <div>
                    <strong>{review.name}</strong><br />
                    <span style={{ fontSize: 13, color: '#777' }}>
                        {review.location}
                    </span>
                </div>
            </div>

            <div style={{ marginTop: 8 }}>
                {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} style={{ color: '#ff9529' }}>★</span>
                ))}
            </div>

            <div style={{
                backgroundColor: '#f9f9f9',
                marginTop: 10,
                padding: 10,
                borderRadius: 5,
                fontSize: 14
            }}>
                {review.text}
            </div>
        </div>
    );
};

export default ReviewCard;
