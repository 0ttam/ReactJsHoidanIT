import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalPreviewImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImageUrl: '',
        };
    }
    componentDidMount() {
        this.setState({
            previewImageUrl: this.props.previewImage,
        });
    }
    toggle = () => {
        this.props.toggleFormParent();
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Xem trước hình ảnh
                </ModalHeader>
                <ModalBody>
                    <div
                        className='col-12'
                        style={{
                            width: '770px',
                            height: '400px',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundImage: `url(${this.props.previewImage})`,
                        }}
                    ></div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='secondary'
                        className='px-3'
                        onClick={() => this.toggle()}
                    >
                        Trở lại
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalPreviewImage);
