import Fuse from 'fuse.js';
import React, {useEffect, useState} from 'react';
import {Button, Input, InputGroup, InputLeftAddon, InputRightAddon, List, ListItem, Popover, PopoverContent, PopoverTrigger} from '@chakra-ui/react';
import {X as CloseIcon, Search as SearchIcon} from 'react-feather';

interface Item
{
  id: string;
  name: string;
  tags: string[];
}

interface SearchProps
{
  itemSelected: (id: string) => void;
  items: Item[];
  maxItems?: number;
}

const Search: React.FC<SearchProps> = (props: SearchProps) =>
{
  //React state
  const [query, setQuery] = useState('');
  const [handler, setHandler] = useState<number>();
  const [items, setItems] = useState<Item[]>();
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  //Close suggestions
  const closeSuggestions = () =>
  {
    setSuggestionsVisible(false);
  };

  //Clear query
  const clearQuery = () =>
  {
    setQuery('');
  };

  //Instantiate Fuse
  const fuse = new Fuse(props.items, {
    keys: ['name', 'tags'],
    threshold: 0.3
  });

  //Search for the item
  useEffect(() =>
  {
    //Clear existing timeouts
    window.clearTimeout(handler);

    //Wait 100ms before performing the search (Will be cancelled if use changes query)
    setHandler(window.setTimeout(() =>
    {
      //If the query isn't empty, search for items
      if (query != '')
      {
        //Search
        const results = fuse.search(query, {
          limit: props.maxItems!
        });

        //Update the items
        setItems(results.map(result => result.item));
      }
    }, 450));
  }, [query]);

  //Hide the suggestions if no items are available
  useEffect(() =>
  {
    if (items != null && items.length > 0)
    {
      setSuggestionsVisible(true);
    }
    else
    {
      setSuggestionsVisible(false);
    }
  }, [items]);

  //Item selected handler
  const itemSelected = (id: string) => () =>
  {
    //Close suggestions
    setSuggestionsVisible(false);

    //Invoke parent handler
    props.itemSelected(id);
  };

  return (
    <Popover autoFocus={false} placement="bottom-start" isOpen={suggestionsVisible} onClose={closeSuggestions}>
      <PopoverTrigger>
        <InputGroup margin="20px 0">
          <InputLeftAddon>
            <SearchIcon />
          </InputLeftAddon>

          <Input onChange={event => setQuery(event.target.value)} value={query} />

          {query.length > 0 &&
            <InputRightAddon padding={0}>
              <Button colorScheme="primary" onClick={clearQuery} roundedStart={0}>
                <CloseIcon />
              </Button>
            </InputRightAddon>
          }
        </InputGroup>
      </PopoverTrigger>

      <PopoverContent>
        <List>
          {items?.map((item, index) =>
            <ListItem key={item.id}>
              <Button
                height="45px"
                onClick={itemSelected(item.id)}
                roundedBottom={index == items.length - 1 ? 'md' : 0}
                roundedTop={index == 0 ? 'md' : 0}
                variant="ghost"
                width="100%"
              >
                {item.name}
              </Button>
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
