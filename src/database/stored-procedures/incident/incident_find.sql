DROP PROCEDURE IF EXISTS incident_find;
CREATE PROCEDURE incident_find(
    IN user_name VARCHAR(255),
    IN nic VARCHAR(15),
    IN contact_number VARCHAR(20),
    IN city VARCHAR(255),
    IN district VARCHAR(255),
    IN province VARCHAR(255),
    IN vehicle_number VARCHAR(255),
    IN device_id VARCHAR(255),
    IN severity VARCHAR(255),
    IN incident_status VARCHAR(15),
    IN items_per_page INT,
    IN page_number INT
)
BEGIN
    DECLARE user_name_cond VARCHAR(255) DEFAULT '';
    DECLARE nic_cond VARCHAR(255) DEFAULT '';
    DECLARE contact_number_cond VARCHAR(255) DEFAULT '';
    DECLARE city_cond VARCHAR(255) DEFAULT '';
    DECLARE district_cond VARCHAR(255) DEFAULT '';
    DECLARE province_cond VARCHAR(255) DEFAULT '';
    DECLARE vehicle_number_cond VARCHAR(255) DEFAULT '';
    DECLARE device_id_cond VARCHAR(255) DEFAULT '';
    DECLARE severity_cond VARCHAR(255) DEFAULT '';
    DECLARE incident_status_cond VARCHAR(255) DEFAULT '';
    DECLARE limit_cond VARCHAR(255) DEFAULT '';

    DROP TEMPORARY TABLE IF EXISTS `tmp_count`;
    CREATE TEMPORARY TABLE `tmp_count`
    (
        total_count INT
    );

    DROP TEMPORARY TABLE IF EXISTS `tmp_data`;
    CREATE TEMPORARY TABLE `tmp_data`
    (
        id              INT,
        fullName        VARCHAR(255),
        nic             VARCHAR(15),
        contactNumber   VARCHAR(20),
        gender          VARCHAR(10),
        city            VARCHAR(255),
        district        VARCHAR(255),
        province        VARCHAR(255),
        vehicleNumber   VARCHAR(255),
        manufactureYear INT,
        vehicleType     VARCHAR(255),
        model           VARCHAR(255),
        deviceId        VARCHAR(255),
        deviceType      VARCHAR(255),
        deviceStatus    VARCHAR(255),
        severity        VARCHAR(255),
        location        VARCHAR(255),
        time            DATETIME,
        incidentStatus  VARCHAR(15)
    );

    IF user_name IS NOT NULL AND user_name <> '' THEN
        SET user_name_cond = CONCAT(' AND u.fullName LIKE "%', user_name, '%"');
    END IF;

    IF nic IS NOT NULL AND nic <> '' THEN
        SET nic_cond = CONCAT(' AND u.nic = "', nic, '"');
    END IF;

    IF contact_number IS NOT NULL AND contact_number <> '' THEN
        SET contact_number_cond = CONCAT(' AND u.contactNumber = "', contact_number, '"');
    END IF;

    IF city IS NOT NULL AND city <> '' THEN
        SET city_cond = CONCAT(' AND u.city LIKE "%', city, '%"');
    END IF;

    IF district IS NOT NULL AND district <> '' THEN
        SET district_cond = CONCAT(' AND u.district LIKE "%', district, '%"');
    END IF;

    IF province IS NOT NULL AND province <> '' THEN
        SET province_cond = CONCAT(' AND u.province LIKE "%', province, '%"');
    END IF;

    IF vehicle_number IS NOT NULL AND vehicle_number <> '' THEN
        SET vehicle_number_cond = CONCAT(' AND v.vehicleNumber = "', vehicle_number, '"');
    END IF;

    IF device_id IS NOT NULL AND device_id <> '' THEN
        SET device_id_cond = CONCAT(' AND d.deviceId = "', device_id, '"');
    END IF;

    IF severity IS NOT NULL AND severity <> '' THEN
        SET severity_cond = CONCAT(' AND i.severity = "', severity, '"');
    END IF;

    IF incident_status IS NOT NULL AND incident_status <> '' THEN
        SET incident_status_cond = CONCAT(' AND i.incidentStatus = "', incident_status, '"');
    END IF;

    IF items_per_page > 0 AND page_number > 0 THEN
        SET @offset = (page_number - 1) * items_per_page;
        SET limit_cond = CONCAT(' LIMIT ', @offset, ', ', items_per_page);
    END IF;

    SET @countQuery = CONCAT(
            'INSERT INTO tmp_count (total_count)
             SELECT COUNT(*)
             FROM tbl_user u
             LEFT JOIN tbl_vehicle v ON v.id = u.vehicleId
             LEFT JOIN tbl_device d ON d.userId = u.id
             LEFT JOIN tbl_incident i ON i.deviceId = d.id
             WHERE 1=1', user_name_cond, nic_cond, contact_number_cond, city_cond, district_cond, province_cond,
            vehicle_number_cond, device_id_cond, severity_cond, incident_status_cond
                      );
    PREPARE stmt1 FROM @countQuery;
    EXECUTE stmt1;
    DEALLOCATE PREPARE stmt1;

    SET @dataQuery = CONCAT(
            'INSERT INTO tmp_data (id,fullName, nic, contactNumber, gender, city, district, province, vehicleNumber,
                                    manufactureYear, vehicleType, model, deviceId, deviceType, deviceStatus, severity,
                                    location, time, incidentStatus)
             SELECT i.id, u.fullName, u.nic, u.contactNumber, u.gender, u.city, u.district, u.province,
                    v.vehicleNumber, v.manufactureYear, v.vehicleType, v.model,
                    d.deviceId, d.type AS deviceType, d.deviceStatus,
                    i.severity, i.location, i.time, i.incidentStatus
             FROM tbl_user u
             LEFT JOIN tbl_vehicle v ON v.id = u.vehicleId
             LEFT JOIN tbl_device d ON d.userId = u.id
             LEFT JOIN tbl_incident i ON i.deviceId = d.id
             WHERE 1=1', user_name_cond, nic_cond, contact_number_cond, city_cond, district_cond, province_cond,
            vehicle_number_cond, device_id_cond, severity_cond, incident_status_cond,
            ' ORDER BY i.time DESC', limit_cond
                     );
    PREPARE stmt2 FROM @dataQuery;
    EXECUTE stmt2;
    DEALLOCATE PREPARE stmt2;

    SELECT page_number                         AS page,
           items_per_page                      AS itemsPerPage,
           (SELECT total_count FROM tmp_count) AS totalItems,
           (SELECT JSON_ARRAYAGG(
                           JSON_OBJECT(
                                   'id', td.id,
                                   'fullName', td.fullName,
                                   'nic', td.nic,
                                   'contactNumber', td.contactNumber,
                                   'gender', td.gender,
                                   'city', td.city,
                                   'district', td.district,
                                   'province', td.province,
                                   'vehicleNumber', td.vehicleNumber,
                                   'manufactureYear', td.manufactureYear,
                                   'vehicleType', td.vehicleType,
                                   'model', td.model,
                                   'deviceId', td.deviceId,
                                   'deviceType', td.deviceType,
                                   'deviceStatus', td.deviceStatus,
                                   'severity', td.severity,
                                   'location', td.location,
                                   'time', td.time,
                                   'incidentStatus', td.incidentStatus
                           )
                   )
            FROM tmp_data td)                  AS data;

    DROP TEMPORARY TABLE IF EXISTS `tmp_count`;
    DROP TEMPORARY TABLE IF EXISTS `tmp_data`;
END;
