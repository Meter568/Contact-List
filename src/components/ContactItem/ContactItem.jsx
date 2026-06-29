import { Component } from 'react';

import styles from './ContactItem.module.css';

class ContactItem extends Component {
    onContactDelete = () => {
        this.props.onDelete(this.props.contact.id);
    };
    render() {
        const { firstName, lastName } = this.props.contact;
        return (
            <div
                className={styles.contact}
                onDoubleClick={() => this.props.onSelect(this.props.contact)}
            >
                <span>
                    {firstName} {lastName}
                </span>
                <button
                    className={styles.btn}
                    onClick={this.onContactDelete}
                >
                    X
                </button>
            </div>
        );
    }
}

export default ContactItem;
