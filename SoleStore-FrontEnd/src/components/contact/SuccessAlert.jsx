import { motion } from 'framer-motion';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SuccessAlert = ({ showAlert, setShowAlert }) => {
    if (!showAlert) return null;
    
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="position-fixed top-0 start-50 translate-middle-x p-3"
            style={{ zIndex: 1050, marginTop: '80px' }}
        >
            <Alert variant="success" className="d-flex align-items-center shadow-lg" onClose={() => setShowAlert(false)} dismissible>
                <div className="me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <div>
                    <strong>Thành công!</strong> Tin nhắn của bạn đã được gửi. Chúng tôi sẽ liên hệ lại sớm nhất có thể!
                </div>
            </Alert>
        </motion.div>
    );
};

SuccessAlert.propTypes = {
    showAlert: PropTypes.bool.isRequired,
    setShowAlert: PropTypes.func.isRequired
};

export default SuccessAlert;