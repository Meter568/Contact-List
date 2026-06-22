import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import styles from './App.module.css';

class App extends Component {
    state = {
        contacts: [],
        currentContact: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        },
    };

    createEmptyContact = () => {
        return {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        };
    };

    clearContact = () => {
        this.setState({
            currentContact: this.createEmptyContact(),
        });
    };

    componentDidMount() {
        const contacts = JSON.parse(localStorage.getItem('contacts'));
        if (!contacts) {
            this.setState({ contacts: [] });
        } else {
            this.setState({ contacts: [...contacts] });
        }
    }

    addContact = (contact) => {
        contact.id = uuidv4();
        this.setState((state) => {
            const contacts = [...state.contacts, contact];
            this.saveToStorage(contacts);
            return {
                contacts,
                currentContact: this.createEmptyContact(),
            };
        });
    };

    updateContact = (contact) => {
        this.setState((state) => {
            const contacts = state.contacts.map((item) => (item.id === contact.id ? contact : item));
            this.saveToStorage(contacts);
            return {
                contacts,
                currentContact: contact,
            };
        });
    };

    saveContact = (contact) => {
        if (!contact.id) {
            this.addContact(contact);
        } else {
            this.updateContact(contact);
        }
    };

    deleteContact = (id) => {
        this.setState((state) => {
            const contacts = state.contacts.filter((contact) => contact.id !== id);
            this.saveToStorage(contacts);
            return {
                contacts,
                currentContact: this.createEmptyContact(),
            };
        });
    };

    saveToStorage = (arrContacts) => {
        localStorage.setItem('contacts', JSON.stringify(arrContacts));
    };

    selectContact = (contact) => {
        this.setState({
            currentContact: contact,
        });
    };

    render() {
        return (
            <>
                <div className={styles.header}>
                    <h1>Contact list</h1>
                </div>
                <div className={styles.main}>
                    <ContactList
                        contacts={this.state.contacts}
                        onDelete={this.deleteContact}
                        onSelect={this.selectContact}
                    />
                    <ContactForm
                        key={this.state.currentContact.id}
                        currentContact={this.state.currentContact}
                        onSave={this.saveContact}
                        onDelete={this.deleteContact}
                        onNew={this.createEmptyContact}
                        clearContact={this.clearContact}
                    />
                </div>
            </>
        );
    }
}

export default App;
