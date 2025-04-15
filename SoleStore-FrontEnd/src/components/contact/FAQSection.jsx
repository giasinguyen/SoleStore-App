import { motion } from 'framer-motion';
import { Accordion, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FAQSection = ({ containerVariants, itemVariants }) => {
    const faqs = [
        {
            id: 'faq-1',
            question: 'Làm thế nào để theo dõi đơn hàng của tôi?',
            answer: 'Bạn có thể theo dõi đơn hàng của mình bằng cách đăng nhập vào tài khoản và truy cập mục "Đơn hàng của tôi". Tại đó, bạn sẽ thấy trạng thái và thông tin chi tiết về đơn hàng của mình.'
        },
        {
            id: 'faq-2',
            question: 'Chính sách đổi trả hàng như thế nào?',
            answer: 'SoleStore chấp nhận đổi trả trong vòng 30 ngày kể từ ngày mua hàng, với điều kiện sản phẩm chưa qua sử dụng và còn nguyên tem nhãn. Vui lòng xem chi tiết trong mục "Chính sách đổi trả" trên website của chúng tôi.'
        },
        {
            id: 'faq-3',
            question: 'Có chương trình khách hàng thân thiết không?',
            answer: 'Có! SoleStore có chương trình khách hàng thân thiết, nơi bạn tích lũy điểm qua mỗi lần mua hàng. Những điểm này có thể đổi thành voucher giảm giá hoặc quà tặng đặc biệt.'
        },
        {
            id: 'faq-4',
            question: 'Chi phí vận chuyển như thế nào?',
            answer: 'Chúng tôi cung cấp giao hàng miễn phí cho đơn hàng trên 1 triệu đồng. Đối với đơn hàng dưới mức này, phí vận chuyển sẽ được tính dựa trên vị trí địa lý và được hiển thị rõ ràng trước khi bạn thanh toán.'
        }
    ];

    return (
        <motion.div
            className="mt-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2 
                className="text-center text-white mb-4" 
                variants={itemVariants}
            >
                Câu Hỏi Thường Gặp
            </motion.h2>
            
            <Accordion defaultActiveKey="0">
                {faqs.map((faq, index) => (
                    <motion.div 
                        key={faq.id}
                        variants={itemVariants}
                    >
                        <Accordion.Item eventKey={index.toString()} className="mb-3 border-0 shadow">
                            <Accordion.Header className="py-2 bg-dark text-white border-0">
                                <span className="fw-bold">{faq.question}</span>
                            </Accordion.Header>
                            <Accordion.Body className="py-3">
                                {faq.answer}
                            </Accordion.Body>
                        </Accordion.Item>
                    </motion.div>
                ))}
            </Accordion>
            
            <style jsx>{`
                .accordion-button {
                    background-color: #212529 !important;
                    color: white !important;
                }
                .accordion-button:not(.collapsed) {
                    color: white !important;
                    background-color: #2c3034 !important;
                }
                .accordion-button:focus {
                    box-shadow: 0 0 0 0.25rem rgba(68, 129, 235, 0.25) !important;
                }
                .accordion-button::after {
                    filter: brightness(200%);
                }
            `}</style>
        </motion.div>
    );
};

FAQSection.propTypes = {
    containerVariants: PropTypes.object.isRequired,
    itemVariants: PropTypes.object.isRequired
};

export default FAQSection;