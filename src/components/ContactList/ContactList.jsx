import { Component } from 'react';

import ContactItem from '../ContactItem/ContactItem';

import styles from './ContactList.module.css';

class ContactList extends Component {
    render() {
        const { contacts, onDelete, onSelect } = this.props;
        return (
            <div className={styles.list}>
                {contacts.length > 0 ? (
                    contacts.map((contact) => {
                        return (
                            <ContactItem
                                key={contact.id}
                                contact={contact}
                                onDelete={onDelete}
                                onSelect={onSelect}
                            />
                        );
                    })
                ) : (
                    <div>No contacts</div>
                )}
            </div>
        );
    }
}

export default ContactList;
