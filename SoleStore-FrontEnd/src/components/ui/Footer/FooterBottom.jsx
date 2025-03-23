import visa from '../../../assets/images/visa.png';
import mastercard from '../../../assets/images/mastercard.png';
import paypal from '../../../assets/images/paypal.png';

const FooterBottom = () => {
    return (
        <div className="border-t border-gray-700/50 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-4">
                    <div className="mb-4 md:mb-0">
                        <img 
                            src="https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/42068879378/original/HeXCMKuLyHCzmaKrdo-I8C6l8vAiyQtM4w.png?1624931763" 
                            alt="Đã đăng ký Bộ Công Thương" 
                            className="h-10 rounded bg-white/90 p-1"
                        />
                    </div>
                    <div className="text-sm text-gray-400 text-center md:text-left">
                        <p>&copy; {new Date().getFullYear()} SoleStyle Vietnam. Tất cả quyền được bảo lưu.</p>
                        <p className="mt-1">Công ty TNHH Thương Mại SoleStyle VN - GPĐKKD: 0123456789</p>
                        <p className="mt-1">Địa chỉ: 12 Nguyễn Văn Bảo, Phương 1, Quận Gò Vấp, TP.HCM
                        - Email: Nhom14@solestyle.vn</p>
                    </div>
                </div>
                
                <div className="flex flex-col items-center md:items-end">
                    <p className="text-gray-300 font-medium mb-3 text-center md:text-right">Chấp nhận thanh toán</p>
                    <div className="flex flex-wrap justify-center md:justify-end gap-2">
                        <div className="payment-method hover:-translate-y-1 transition-transform duration-300">
                            <img src={visa} alt="Visa" className="h-6" />
                        </div>
                        <div className="payment-method hover:-translate-y-1 transition-transform duration-300">
                            <img src={mastercard} alt="Mastercard" className="h-6" />
                        </div>
                        <div className="payment-method hover:-translate-y-1 transition-transform duration-300">
                            <img src={paypal} alt="PayPal" className="h-6" />
                        </div>
                        <div className="payment-method px-2 hover:-translate-y-1 transition-transform duration-300">
                            <span className="text-xs font-semibold bg-gradient-to-r from-pink-500 to-pink-600 text-white px-2 py-1 rounded">MoMo</span>
                        </div>
                        <div className="payment-method px-2 hover:-translate-y-1 transition-transform duration-300">
                            <span className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded">VNPAY</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .payment-method {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 28px;
                    background-color: rgba(255, 255, 255, 0.95);
                    border-radius: 6px;
                    padding: 0 8px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
};

export default FooterBottom;
