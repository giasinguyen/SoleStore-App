import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ContactMap = ({ mapVariants }) => {
    return (
        <motion.div
            className="mt-5 p-2 bg-white rounded shadow-lg"
            variants={mapVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="ratio ratio-21x9" style={{ minHeight: '400px' }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1463.5159536945616!2d106.68790920404064!3d10.821791602004536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e1!3m2!1svi!2s!4v1744790121463!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="SoleStore Location Map">
                </iframe>
            </div>
        </motion.div>
    );
};

ContactMap.propTypes = {
    mapVariants: PropTypes.object.isRequired
};

export default ContactMap;