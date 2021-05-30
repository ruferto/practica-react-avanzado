import React from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { tagListAction } from '../store/actions';
import { getTags } from '../store/selectors';

const SelectTag = ({ handleChange, selected, setTagsForNew, width }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(tagListAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tags = useSelector(getTags);

  const tagsList = tags.map((tag) => {
    return { label: tag, value: tag };
  });

  const selectedTags =
    selected && selected.length
      ? selected.map((tag) => {
          return { label: tag, value: tag };
        })
      : [];

  const changeTags = (event) => {
    if (handleChange) {
      const qTags = event.map((tag) => tag.label);
      if (setTagsForNew) setTagsForNew(qTags);
      handleChange({
        target: {
          name: 'tags',
          value: qTags,
        },
      });
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: width || '30vw',
    }),
  };
  return (
    <Select
      styles={customStyles}
      value={selectedTags}
      defaultValue={selectedTags}
      options={tagsList}
      onChange={changeTags}
      isMulti
    />
  );
};

export default SelectTag;
