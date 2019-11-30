import React, { useState } from 'react';
import TagsInput from './Components/TagsInput';

function App () {

    const [tags, setTags] = useState([
        'google',
        'apple'
    ]);

    return (
        <div className="tagsInput">
            <TagsInput
                tags={tags}
                handleTagsChange={setTags}
            />
        </div>
    );
}

export default App;
