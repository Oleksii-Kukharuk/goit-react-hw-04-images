import { React, useState } from 'react';
import { toast } from 'react-toastify';
import {
  SearchbarStyled,
  SearchForm,
  SearchButton,
  ButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [querySearch, setQuerySearch] = useState('');

  const onInputChange = e => {
    setQuerySearch(e.target.value.toLowerCase());
  };

  const onInputSubmit = e => {
    e.preventDefault();

    if (querySearch.trim() === '') {
      toast.error('Пустий запит??!?! Серйозно??!');
      return;
    }

    onSubmit(querySearch);

    setQuerySearch('');
  };

  return (
    <SearchbarStyled>
      <SearchForm className="form" onSubmit={onInputSubmit}>
        <SearchButton type="submit" className="button">
          <ButtonLabel className="button-label">Search</ButtonLabel>
        </SearchButton>

        <SearchInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputChange}
          value={querySearch}
        />
      </SearchForm>
    </SearchbarStyled>
  );
};
