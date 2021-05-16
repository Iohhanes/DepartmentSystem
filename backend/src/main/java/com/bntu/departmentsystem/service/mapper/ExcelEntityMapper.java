package com.bntu.departmentsystem.service.mapper;

import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public abstract class ExcelEntityMapper<T, K> {
    public List<K> from(List<T> excelEntities) throws InvalidUploadFileException {
        if (!CollectionUtils.isEmpty(excelEntities)) {
            List<K> entities = new ArrayList<>();
            for (T excelEntity : excelEntities) {
                K entity = from(excelEntity);
                entities.add(entity);
            }
            return entities;
        }
        return Collections.emptyList();
    }

    public abstract K from(T excelEntity) throws InvalidUploadFileException;
}
