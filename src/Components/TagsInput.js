import React from 'react';
import Tag from './Tag';

import styles from './TagsInput.module.css';

class TagsInput extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            tagValue: ''
        };

        this.tagInputRef = React.createRef();

    }

    handleTagDeleteClick = (index) => {

        const tags = [...this.props.tags];
        tags.splice(index, 1);

        this.props.handleTagsChange(tags);
        this.focusInput();

    }

    handleInputFocus = () => {

        this.setState({
            active: true
        });

    }

    handleInputBlur = () => {

        this.setState({
            active: false
        });

    }

    handleInputChange = (e) => {

        this.setState({
            tagValue: e.target.value.replace(/,/g, '')
        });

    }

    handleInputKeyPress = (e) => {

        // press enter or ,
        if ((e.key === 'Enter' || e.key === ',') &&
            e.target.value !== '') {

            const tags = [...this.props.tags, e.target.value];
            this.props.handleTagsChange(tags);

            this.setState({
                tagValue: ''
            });

        }

    }

    handleInputKeyDown = (e) => {

        // press backspace
        if (e.target.value === '' && e.keyCode === 8 && this.props.tags.length) {

            this.handleTagDeleteClick(this.props.tags.length - 1);

        }

    }

    focusInput = () => {

        this.tagInputRef.current.focus();

    }

    render () {

        return (

            <div className={styles.container}>

                <div
                    className={`${styles.tagWrapper}
                        ${this.state.active
                                ? (styles.active)
                                : ('')}`}
                    onClick={this.focusInput}
                >
                    {
                        this.props.tags.map((tagname, idx) => (

                            <Tag
                                key={idx}
                                index={idx}
                                tagname={tagname}
                                handleTagDeleteClick={this.handleTagDeleteClick}
                            />

                        ))
                    }
                    <input
                        className={styles.tagInput}
                        placeholder="請輸入..."
                        size="4"
                        ref={this.tagInputRef}
                        value={this.state.tagValue}
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputBlur}
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleInputKeyPress}
                        onKeyDown={this.handleInputKeyDown}
                    />
                </div>

            </div>

        );

    }

}

export default TagsInput;
