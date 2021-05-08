import React, {PropsWithChildren, ReactElement, useCallback, useState} from "react";
import {AutoComplete} from "antd";
import {Suggestion} from "../../model/suggestion.model";
import {search} from "../../utils/search-utils";
import {debounce} from "lodash";
import {Entity} from "../../model/entity.model";
import {DEBOUNCE_WAIT} from "../../utils/constants.utils";


interface SearchBarComponentProps<T extends Entity> {
    prefix: string;
    placeholder: string;
    onConvert: (entity: T) => Suggestion;
    onSelect?: (value: string) => void;
}

const SearchBarComponent = <T extends Entity>({
                                                  prefix,
                                                  placeholder,
                                                  onConvert,
                                                  onSelect
                                              }: PropsWithChildren<SearchBarComponentProps<T>>): ReactElement<any, any> | null => {
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

    return (
        <div className="search-bar">
            <AutoComplete
                style={{
                    width: 300
                }}
                value={value}
                options={options}
                onSelect={onSelect}
                onSearch={handleSearch}
                onChange={handleChange}
                placeholder={placeholder}
                notFoundContent="Not found"
            />
        </div>
    )
}


export default React.memo(SearchBarComponent) as typeof SearchBarComponent;