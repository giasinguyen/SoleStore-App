import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ContactHeader = ({ containerVariants, itemVariants }) => {
    return (
        <motion.div 
            className="text-center mb-5 text-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 
                className="display-4 fw-bold mb-4"
                variants={itemVariants}
            >
                Liên Hệ Với Chúng Tôi
            </motion.h1>
            <motion.p 
                className="lead text-white-50 mb-0 w-75 mx-auto"
                variants={itemVariants}
            >
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Dù là thắc mắc về sản phẩm, phản hồi về dịch vụ, hay đơn giản chỉ là muốn nói chuyện, hãy liên hệ với chúng tôi theo thông tin bên dưới.
            </motion.p>
        </motion.div>
    );
};

ContactHeader.propTypes = {
    containerVariants: PropTypes.object.isRequired,
    itemVariants: PropTypes.object.isRequired
};

export default ContactHeader;