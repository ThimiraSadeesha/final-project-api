DROP PROCEDURE IF EXISTS `accident_detection_DB`.`notification_save`;
CREATE PROCEDURE `accident_detection_DB`.`notification_save`(
    IN type_val VARCHAR(255),
    IN message_val VARCHAR(255),
    IN location_val VARCHAR(255),
    IN user_val INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
            ROLLBACK;
        END;

    START TRANSACTION;
    INSERT INTO tbl_notification (type, message, location, notificationId)
    VALUES (type_val, message_val, location_val, user_val);

    COMMIT;
    SET @InsertedID = LAST_INSERT_ID();
    CALL notification_get(@InsertedID);
END;