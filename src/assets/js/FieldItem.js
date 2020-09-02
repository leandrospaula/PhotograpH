import React, { Component, Fragment } from 'react';
import InputMask from 'react-input-mask';

export class FieldItem extends Component {
    render() {
        return (
            <div className={`field ${this.props.itemName}`}>
                {this.props.itemType == 'radio' ? (
                    <Fragment>
                        <div id={this.props.itemName}>
                            {this.props.itemOptions.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <label className="radio">
                                            {item.name}
                                            <input
                                                name={this.props.itemName}
                                                type={this.props.itemType}
                                                value={item.value}
                                                onChange={this.props.handleChange}
                                                onBlur={this.props.handleBlur}
                                                className={
                                                    this.props.errors[this.props.itemName] &&
                                                    this.props.touched[this.props.itemName]
                                                        ? 'text-input error'
                                                        : 'text-input'
                                                }
                                            />
                                            <i />
                                        </label>
                                    </Fragment>
                                );
                            })}
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <label htmlFor={this.props.itemName}>{this.props.itemLabel}</label>
                        <InputMask
                            id={this.props.itemName}
                            placeholder={this.props.itemLabel}
                            type={this.props.itemType}
                            value={this.props.values.itemName}
                            onChange={this.props.handleChange}
                            onBlur={this.props.handleBlur}
                            className={
                                this.props.errors[this.props.itemName] && this.props.touched[this.props.itemName]
                                    ? 'text-input error'
                                    : 'text-input'
                            }
                        />
                    </Fragment>
                )}
                {this.props.errors[this.props.itemName] && (
                    <span className="input-error">{this.props.errors[this.props.itemName]}</span>
                )}
            </div>
        );
    }
}
