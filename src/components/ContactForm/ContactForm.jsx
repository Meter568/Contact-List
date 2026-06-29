import { Component } from 'react';

import styles from './ContactForm.module.css';

class ContactForm extends Component {
    state = {
        ...this.props.currentContact,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentContact.id !== prevState.id) {
            return {
                ...nextProps.currentContact,
            };
        }
        return null;
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    clearState = () => {
        this.setState({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        });
    };

    onClearInput = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const sibling = event.target.parentNode.firstChild;
        this.setState({
            [sibling.name]: '',
        });
    };

    onFormNew = (event) => {
        event.preventDefault();
        if (!this.state.id) {
            this.clearState();
        } else {
            this.props.clearContact();
        }
    };

    onFormSave = (event) => {
        event.preventDefault();
        this.props.onSave({
            ...this.state,
        });
        if (!this.state.id) {
            this.clearState();
        }
    };


    onContactDelete = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.onDelete(this.props.currentContact.id);
        this.props.clearContact();
    };

    render() {
        return (
            <form
                className={styles.form}
                onSubmit={this.onFormSave}
            >
                <div className={styles.inputs}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={this.state.firstName}
                        onChange={this.onInputChange}
                        required
                    />
                    <button
                        className={styles['btn-clear']}
                        onClick={this.onClearInput}
                    >
                        X
                    </button>
                </div>
                <div className={styles.inputs}>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={this.state.lastName}
                        onChange={this.onInputChange}
                        required
                    />
                    <button
                        className={styles['btn-clear']}
                        onClick={this.onClearInput}
                    >
                        X
                    </button>
                </div>
                <div className={styles.inputs}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onInputChange}
                    />
                    <button
                        className={styles['btn-clear']}
                        onClick={this.onClearInput}
                    >
                        X
                    </button>
                </div>
                <div className={styles.inputs}>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={this.state.phone}
                        onChange={this.onInputChange}
                    />
                    <button
                        className={styles['btn-clear']}
                        onClick={this.onClearInput}
                    >
                        X
                    </button>
                </div>
                <div className={styles.btns}>
                    <button
                        className={styles.btn}
                        onClick={this.onFormNew}
                    >
                        New
                    </button>
                    <button className={styles.btn}>Save</button>
                    {this.state.id && (
                        <button
                            className={styles.btn}
                            onClick={this.onContactDelete}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        );
    }
}

export default ContactForm;
