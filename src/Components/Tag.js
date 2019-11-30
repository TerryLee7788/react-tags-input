import React, { PureComponent } from 'react';
import styles from './Tag.module.css';

class Tag extends PureComponent {

    render () {

        const {
            tagname,
            index,
            handleTagDeleteClick
        } = this.props;

        return (
            <div className={styles.tag}>
                {tagname}
                <button
                    className={styles.deleteBtn}
                    title="移除標籤"
                    onClick={() => {

                        handleTagDeleteClick(index);

                    }}
                >
                    <span className={styles.closeIcon}>x</span>
                </button>
            </div>
        );

    }

}

export default Tag;
