import { Form, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ContactForm = ({
  formData,
  validated,
  handleChange,
  handleSubmit,
  containerVariants,
  itemVariants,
  buttonVariants,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-100"
    >
      <Card className="bg-dark text-white h-100 border-0">
        <Card.Body className="p-4">
          <motion.h3
            className="mb-4 border-bottom pb-2"
            variants={itemVariants}
          >
            Gửi Tin Nhắn
          </motion.h3>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <motion.div variants={itemVariants}>
              <Form.Group className="mb-3">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="formName"
                  placeholder="Nhập họ tên của bạn"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-dark text-white border-secondary"
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập họ tên của bạn.
                </Form.Control.Feedback>
              </Form.Group>
            </motion.div>

            <div className="row">
              <div className="col-md-6">
                <motion.div variants={itemVariants}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      id="formEmail"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-dark text-white border-secondary"
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập email hợp lệ.
                    </Form.Control.Feedback>
                  </Form.Group>
                </motion.div>
              </div>
              <div className="col-md-6">
                <motion.div variants={itemVariants}>
                  <Form.Group className="mb-3">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      id="formPhone"
                      placeholder="0123456789"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-dark text-white border-secondary"
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập số điện thoại.
                    </Form.Control.Feedback>
                  </Form.Group>
                </motion.div>
              </div>
            </div>

            <motion.div variants={itemVariants}>
              <Form.Group className="mb-3">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="formSubject"
                  placeholder="Tiêu đề tin nhắn"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-dark text-white border-secondary"
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập tiêu đề tin nhắn.
                </Form.Control.Feedback>
              </Form.Group>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Form.Group className="mb-3">
                <Form.Label>Nội dung tin nhắn</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  id="formMessage"
                  placeholder="Nội dung bạn muốn gửi..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{ height: "120px", resize: "none" }}
                  className="bg-dark text-white border-secondary"
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập nội dung tin nhắn.
                </Form.Control.Feedback>
              </Form.Group>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  id="formTerms"
                  label="Tôi đồng ý với Điều khoản & Điều kiện"
                  feedback="Bạn phải đồng ý trước khi gửi."
                  feedbackType="invalid"
                  className="text-white-50"
                />
              </Form.Group>
            </motion.div>

            <motion.div variants={itemVariants} className="d-grid">
              <motion.button
                type="submit"
                className="btn btn-primary py-2"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                style={{
                  background: "linear-gradient(to right, #4481eb, #04befe)",
                  border: "none",
                }}
              >
                Gửi Tin Nhắn
              </motion.button>
            </motion.div>
          </Form>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

ContactForm.propTypes = {
  formData: PropTypes.object.isRequired,
  validated: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  containerVariants: PropTypes.object.isRequired,
  itemVariants: PropTypes.object.isRequired,
  buttonVariants: PropTypes.object.isRequired,
};

export default ContactForm;
