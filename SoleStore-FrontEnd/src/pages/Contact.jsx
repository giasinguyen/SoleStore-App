import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ContactHeader from '../components/contact/ContactHeader';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import ContactMap from '../components/contact/ContactMap';
import FAQSection from '../components/contact/FAQSection';
import SuccessAlert from '../components/contact/SuccessAlert';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id.replace('form', '').toLowerCase()]: value
        }));
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // Trong thực tế sẽ gửi dữ liệu đến server
            console.log('Form data:', formData);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
        }
        
        setValidated(true);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const buttonVariants = {
        rest: { scale: 1 },
        hover: { 
            scale: 1.05,
            boxShadow: '0px 0px 8px rgb(68, 129, 235)'
        },
        tap: { scale: 0.95 }
    };

    const mapVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6,
                delay: 0.4
            } 
        }
    };

    return (
        <div className="contact-page py-5" style={{ background: '#121212', minHeight: '100vh' }}>
            <Container>
                {/* Alert for Form Submission */}
                <SuccessAlert showAlert={showAlert} setShowAlert={setShowAlert} />

                {/* Contact Header Section */}
                <ContactHeader 
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                />

                <Row className="g-4">
                    <Col lg={5}>
                        {/* Contact Information */}
                        <ContactInfo 
                            containerVariants={containerVariants}
                            itemVariants={itemVariants}
                        />
                    </Col>
                    <Col lg={7}>
                        {/* Contact Form */}
                        <ContactForm 
                            formData={formData}
                            validated={validated}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            containerVariants={containerVariants}
                            itemVariants={itemVariants}
                            buttonVariants={buttonVariants}
                        />
                    </Col>
                </Row>

                {/* Google Map */}
                <ContactMap mapVariants={mapVariants} />

                {/* FAQ Section */}
                <FAQSection
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                />
            </Container>
        </div>
    );
};

export default Contact;
