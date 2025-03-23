import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AccountIcon = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/account');
    };

    return (
        <button className="header-icon-button" onClick={handleClick}>
            <User className="icon-svg" />

            <style>{`
                .header-icon-button {
                    background: transparent;
                    border: none;
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                
                .header-icon-button:hover {
                    background: rgba(245, 158, 11, 0.2);
                    transform: translateY(-2px);
                }
                
                .icon-svg {
                    width: 22px;
                    height: 22px;
                }
            `}</style>
        </button>
    );
};

export default AccountIcon;