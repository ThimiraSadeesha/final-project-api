DROP PROCEDURE IF EXISTS hospital_find;
CREATE PROCEDURE hospital_find(
    IN code_val VARCHAR(255),
    IN name_val VARCHAR(255),
    IN items_per_page INT,
    IN page_number INT
)
BEGIN
    DECLARE code_cond VARCHAR(255) DEFAULT '';
    DECLARE name_cond VARCHAR(255) DEFAULT '';
    DECLARE area_cond VARCHAR(255) DEFAULT '';
    DECLARE limit_cond VARCHAR(255) DEFAULT '';


    DROP TEMPORARY TABLE IF EXISTS `tmp_count`;
    CREATE TEMPORARY TABLE `tmp_count`
    (
        total_count INT
    );


    DROP TEMPORARY TABLE IF EXISTS `tmp_data`;
    CREATE TEMPORARY TABLE `tmp_data`
    (
        id       INT,
        code     VARCHAR(255),
        name     VARCHAR(255),
        number   VARCHAR(255),
        city     VARCHAR(255),
        district VARCHAR(255),
        province VARCHAR(255),
        area     VARCHAR(255)
    );


    IF code_val <> '' THEN
        SET code_cond = CONCAT(' AND f.city LIKE "%', code_val, '%"');
    END IF;
    IF name_val <> '' THEN
        SET name_cond = CONCAT(' AND f.fireName LIKE "%', name_val, '%"');
    END IF;

    IF items_per_page > 0 AND page_number > 0 THEN
        SET @offset = (page_number - 1) * items_per_page;
        SET limit_cond = CONCAT(' LIMIT ', @offset, ', ', items_per_page);
    END IF;

    SET @countQuery = CONCAT(
            'INSERT INTO tmp_count (total_count)
             SELECT COUNT(*)
             FROM tbl_hospital f
             WHERE f.id > 0', name_cond, area_cond, ';'
                      );
    PREPARE stmt1 FROM @countQuery;
    EXECUTE stmt1;
    DEALLOCATE PREPARE stmt1;

    SET @final_query = CONCAT(
            'INSERT INTO tmp_data (id, code, name, number,city,district,province,area)
             SELECT id,hospitalCode,hospitalName,contactNumber,city,district,province,areaCovered
             FROM tbl_hospital f
             WHERE f.id > 0', name_cond, area_cond,
            ' GROUP BY f.id ORDER BY f.id DESC', limit_cond, ';'
                       );

    PREPARE stmt2 FROM @final_query;
    EXECUTE stmt2;
    DEALLOCATE PREPARE stmt2;

    SELECT page_number                         AS page,
           items_per_page                      AS itemsPerPage,
           (SELECT total_count FROM tmp_count) AS totalItems,
           (SELECT JSON_ARRAYAGG(
                           JSON_OBJECT(
                                   'id', td.id,
                                   'code', td.code,
                                   'name', td.name,
                                   'mobileNumber', td.number,
                                   'area', td.area,
                                   'city', td.city,
                                   'district', td.district,
                                   'province', td.province
                           )
                   )
            FROM tmp_data td)                  AS data;

    DROP TEMPORARY TABLE IF EXISTS `tmp_count`;
    DROP TEMPORARY TABLE IF EXISTS `tmp_data`;
END;
