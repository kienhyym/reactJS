import { Modal } from "antd";
import extend from "../../../public/image/extend.png";

const ModalExtend = ({ open, onCancel, onSubmit }) => {


    const handleOk = () => {
    };

    return (
        <Modal
            title="Thêm nội dung chương học"
            open={open}
            onCancel={onCancel}
            onOk={handleOk}
            width={1500} 
            // style={{background: 'transparent' ,height:'1000px',width:'1000px'}}
        >
            <div style={{background: 'transparent' ,width:'1000px',height:'1000px'}}>
                <img src={extend} alt="glass"         style={{ width: "100%", objectFit: "contain" }}
/>
            </div>
        </Modal>
    );
};

export default ModalExtend;