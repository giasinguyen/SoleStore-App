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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7943838499486!2d106.68468537594033!3d10.827539089318783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f4a62fce9b%3A0xc99902aa1e26ef02!2zMTIgTmd1eeG7hW4gVsSDbiBC4bqjbywgUGjGsOG7nW5nIDQsIEfDsiBW4bqlcCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1649830347602!5m2!1svi!2s" 
                    width="100%" 
                    height="100%" 
                    style={{border: 0}} 
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