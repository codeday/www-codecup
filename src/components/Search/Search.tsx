import Fuse from 'fuse.js';
import React, {FormEvent, useState} from 'react';
import {Input, InputGroup, InputLeftAddon, List, ListItem, Popover, PopoverContent, PopoverTrigger} from '@chakra-ui/react';
import {Search as SearchIcon} from 'react-feather';

interface Item
{
  id: string;
  name: string;
  tags: string[];
}

interface SearchProps
{
  items: Item[];
  maxItems?: number;
}

const Search: React.FC<SearchProps> = (props: SearchProps) =>
{
  //React state
  const [handler, setHandler] = useState<number>();
  const [items, setItems] = useState<Item[]>();
  const [popupOpen, setPopupOpen] = useState(false);

  //Popup manipulation functions
  const closePopup = () =>
  {
    setPopupOpen(false);
  };

  //Instantiate Fuse
  const fuse = new Fuse(props.items, {
    keys: ['name', 'tags'],
    threshold: 0.3
  });

  //Search for the item
  const search = (event: FormEvent) =>
  {
    //Set the value
    const query = (event.target as HTMLInputElement).value;

    //Clear existing timeouts
    window.clearTimeout(handler);

    //Wait 100ms before performing the search (Will be cancelled if use changes query)
    setHandler(window.setTimeout(() =>
    {
      //If query is empty, show max items
      if (query == '')
      {
        setItems(props.items.length > props.maxItems! ? props.items.slice(0, props.maxItems!) : props.items);
      }
      //Otherwise search for the items
      else
      {
        //Search
        const results = fuse.search(query, {
          limit: props.maxItems!
        });

        //Update the items
        setItems(results.map(result => result.item));
      }

      //Show the popup
      setPopupOpen(true);
    }, 450));
  };

  return (
    <Popover autoFocus={false} placement="bottom-start" isOpen={popupOpen} onClose={closePopup}>
      <PopoverTrigger>
        <InputGroup margin="20px 0">
          <InputLeftAddon>
            <SearchIcon />
          </InputLeftAddon>
          <Input onChange={search} />
        </InputGroup>
      </PopoverTrigger>

      <PopoverContent>
        <List padding="5px 0" spacing={3}>
          {items?.map(item =>
            <ListItem key={item.id}>
              {item.name}
            </ListItem>
          )}
        </List>
      </PopoverContent>
    </Popover>
  );
};

Search.defaultProps = {
  maxItems: 10
};

export default Search;
