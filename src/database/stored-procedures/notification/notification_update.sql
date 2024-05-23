DROP PROCEDURE IF EXISTS `accident_detection_DB`.`notification_update`;
CREATE PROCEDURE `accident_detection_DB`.`notification_update`(
    IN notification_id INT,
    IN type_val VARCHAR (255),
    IN message_val VARCHAR (255),
    IN location_val VARCHAR (255),
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

        UPDATE tbl_notification
        SET type           = type_val,
            message        = message_val,
            location       = location_val,
            notificationId = user_val
        WHERE id = notification_id;

COMMIT;

SET
@InsertedID = LAST_INSERT_ID();
CALL notification_get(@InsertedID);
END