import React from 'react';
// import "../css/modal.css";

const Modal = (props) => {

    const { open, close, header, _onClick, clickName } = props;

    return (

        <div className={open ? 'openModal modal' : 'modal'}>
            { open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        <button className="close" onClick={_onClick}> {clickName} </button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}

export default Modal;