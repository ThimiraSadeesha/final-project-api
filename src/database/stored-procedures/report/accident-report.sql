DROP PROCEDURE IF EXISTS incident_report_find;
CREATE PROCEDURE incident_report_find(
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
    IN start_date VARCHAR(50),
    IN end_date VARCHAR(50)
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
    DECLARE date_range_cond VARCHAR(255) DEFAULT '';


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

    IF start_date IS NOT NULL AND end_date IS NOT NULL THEN
        SET date_range_cond = CONCAT(' AND i.time, BETWEEN "', start_date, '" AND "', end_date, '"');
    END IF;

    SET @query = CONCAT(
            'SELECT
                u.fullName, u.nic, u.contactNumber, u.gender, u.city, u.district, u.province,
                v.vehicleNumber, v.manufactureYear, v.vehicleType, v.model,
                d.deviceId, d.type AS deviceType, d.deviceStatus,
                i.severity, i.location, i.time, i.incidentStatus
            FROM tbl_user u
            LEFT JOIN tbl_vehicle v ON v.id = u.vehicleId
            LEFT JOIN tbl_device d ON d.userId = u.id
            LEFT JOIN tbl_incident i ON i.deviceId = d.id
            WHERE 1=1',
            user_name_cond, nic_cond, contact_number_cond, city_cond, district_cond, province_cond,
            vehicle_number_cond, device_id_cond, severity_cond, incident_status_cond, date_range_cond,
            ' ORDER BY i.time DESC', limit_cond
                 );


    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END;
