import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../store/actions'

import { Input } from './Input'

class Donate extends React.Component {
    state = {
        formData: {
            username: {
                attr: {
                    type: "text",
                    placeholder: "Tavs vārds"
                },
                value: "",
                valid: true,
                rules: {
                    minChars: 3,
                    maxChars: 25
                }
            },
            comment: {
                attr: {
                    type: "text",
                    placeholder: "Tavs komentārs"
                },
                value: "",
                valid: true,
                rules: {
                    minChars: 3,
                    maxChars: 75
                }
            },
            price: {
                attr: {
                    type: "select",
                    placeholder: "Ziedojuma cena",
                    onChange: () => {
                        console.log("test")
                    },
                },
                options: [
                    { value: 1, display: '1.00 EUR' },
                    { value: 1.5, display: '1.50 EUR' },
                    { value: 2.0, display: '2.00 EUR' }
                ],
                value: 0,
                valid: true
            },
            code: {
                attr: {
                    type: "hidden",
                    placeholder: "Saņemtais kods"
                },
                value: "",
                valid: true
            }
        },
        payment: null,
        formValid: false
    }

    handleSMS() {
        this.props.getSMSKey(this.state.formData.price.value)
        this.setState({ payment: "sms"})
    }

    handlePayPal() {
        this.setState({ payment: "paypal" })
    }

    handleChange(input, event) {
        const currentForm = this.state.formData
        const currentInput = this.state.formData[input.id]
        let newValue = event.target.value
        if (input.id === "price") {
            newValue = Number(newValue)
            if (this.state.payment === "sms") {
                this.props.getSMSKey(newValue)
            }
        }
        this.setState({ formData: {
            ...currentForm,
            [input.id]: {
                ...currentInput,
                value: newValue
            }
        }
        })
    }

    render() {
        let formData = []
        for (let key in this.state.formData) {
            formData.push({ id: key, ...this.state.formData[key] })
        }
        return (
            <>
                <h3>Donate</h3>
                <form>
                    {formData.map((input, index) => <Input change={(event) => this.handleChange(input, event)} key={index} {...input} /> )}
                    {(this.state.payment === "sms" && this.props.smsKey !== null) ?
                    <div className="alert alert-primary" role="alert">
                        {this.props.smsKey === null ? "Loading..." : `Sūti SMS ${this.props.shop.smskey} B${this.props.smsKey} uz numuru 1881.`}<br />
                        <small>Maksa ({this.state.formData.price.value.toFixed(2)} EUR) tiks pievienota telefona rēķinam vai atrēķināta no priekšapmaksas kartes.</small>
                    </div>
                    : ""}
                    {this.state.formData.price.value !== 0 ?
                    (
                        <>
                        <button className="btn btn-primary" type="button" onClick={() => this.handlePayPal()}>PayPal</button>
                        <button className="btn btn-primary" type="button" onClick={() => this.handleSMS()}>SMS</button>
                        </>
                    ) : null}
                    
                </form>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        shop: state.shop.shopData,
        smsKey: state.shop.smsKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSMSKey: price => dispatch(actions.getSMSKey(price))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Donate)