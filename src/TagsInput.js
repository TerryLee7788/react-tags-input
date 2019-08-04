import React from 'react';
import './TagsInput.css';

const Tag = ({ tagname, index, handleTagDeleteClick }) => (
    <div className="tag">
        {tagname}
        <button
            className="deleteBtn"
            title="移除標籤"
            onClick={() => {

                handleTagDeleteClick(index);

            }}
        >
            <span className="closeIcon">x</span>
        </button>
    </div>
);

class TagsInput extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            tags: [
                'google',
                'apple'
            ],
            tagValue: ''
        };

        this.tagInputRef = React.createRef();

    }

    handleTagDeleteClick = (index) => {

        this.setState((state) => {

            const tags = [...state.tags];
            tags.splice(index, 1);

            return {
                tags
            };

        }, this.focusInput);

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

            const tags = [...this.state.tags, e.target.value];
            this.setState({
                tags,
                tagValue: ''
            });

        }

    }

    handleInputKeyDown = (e) => {

        // press backspace
        if (e.target.value === '' && e.keyCode === 8 && this.state.tags.length) {

            this.handleTagDeleteClick(this.state.tags.length - 1);

        }

    }

    focusInput = () => {

        this.tagInputRef.current.focus();

    }

    render () {

        return (

            <div className="container">

                <div
                    className={`tagWrapper 
                        ${this.state.active
                                ? ('active')
                                : ('')}`}
                    onClick={this.focusInput}
                >
                    {
                        this.state.tags.map((tagname, idx) => (

                            <Tag
                                key={idx}
                                index={idx}
                                tagname={tagname}
                                handleTagDeleteClick={this.handleTagDeleteClick}
                            />

                        ))
                    }
                    <input
                        className="tagInput"
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
