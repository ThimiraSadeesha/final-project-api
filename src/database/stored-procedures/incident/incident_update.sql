DROP PROCEDURE IF EXISTS `accident_detection_DB`.`incident_update`;
CREATE PROCEDURE `accident_detection_DB`.`incident_update`(
    IN p_id INT,
    IN p_severity VARCHAR(255),
    IN p_location VARCHAR(255),
    IN p_incidentStatus VARCHAR(15),
    IN p_deviceId INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
        SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        ROLLBACK;
    END;

    START TRANSACTION;
            SELECT COUNT(*)
            INTO @record_count
            FROM tbl_incident tp
            WHERE tp.id = p_id;
    IF @record_count > 1 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Multiple records found. Please contact system administrator.';
    ELSE IF @record_count = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'Records not found. Please contact system administrator.';
    ELSE

    UPDATE tbl_incident
    SET
        severity = p_severity,
        location = p_location,
        time = CURRENT_TIMESTAMP,
        incidentStatus = p_incidentStatus,
        deviceId = p_deviceId
    WHERE id = p_id;
    END IF;
    COMMIT;
    END IF;
        SET @InsertedID = LAST_INSERT_ID();
        CALL incident_get(@InsertedID);
END