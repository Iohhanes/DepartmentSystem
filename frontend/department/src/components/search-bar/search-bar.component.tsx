import React, {PropsWithChildren, ReactElement, useCallback, useState} from "react";
import {AutoComplete} from "antd";
import {Suggestion} from "../../model/suggestion.model";
import {search} from "../../utils/search-utils";
import {debounce} from "lodash";
import {Entity} from "../../model/entity.model";
import {DEBOUNCE_WAIT} from "../../utils/constants.utils";
import {useHistory} from "react-router";


interface SearchBarComponentProps<T extends Entity> {
    prefix: string;
    placeholder: string;
    onConvert: (entity: T) => Suggestion;
}

const SearchBarComponent = <T extends Entity>({
                                                  prefix,
                                                  placeholder,
                                                  onConvert
                                              }: PropsWithChildren<SearchBarComponentProps<T>>): ReactElement<any, any> | null => {
    const history = useHistory();

    const [options, setOptions] = useState<Suggestion[]>([]);
    const [value, setValue] = useState("");

    const handleSearch = useCallback((value: string) => {
        const updateResults = () => {
            if (value) {
                search<T>(prefix, value).then((newOptions) => {
                    setOptions(newOptions.map(newOption => onConvert(newOption)))
                });
            }
        };
        debounce(updateResults, DEBOUNCE_WAIT)();
    }, [setOptions, onConvert, prefix])

    const handleChange = useCallback((value, option) => {
        setValue(option.label)
    }, [setValue])

    const handleSelect = useCallback((value: string) => {
        history.push(`/${prefix}/${value}`)
    }, [history, prefix]);

    return (
        <div className="search-bar">
            <AutoComplete
                style={{
                    width: 300
                }}
                value={value}
                options={options}
                onSelect={handleSelect}
                onSearch={handleSearch}
                onChange={handleChange}
                placeholder={placeholder}
                notFoundContent="Not found"
            />
        </div>
    )
}


export default React.memo(SearchBarComponent) as typeof SearchBarComponent;