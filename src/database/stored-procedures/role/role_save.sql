DROP PROCEDURE IF EXISTS `accident_detection_DB`.`role_save`;
CREATE PROCEDURE `accident_detection_DB`.`role_save`(
    IN p_roleName VARCHAR(255),
    IN p_permission VARCHAR(255),
    IN p_roleStatus VARCHAR(50)
)
BEGIN
    DECLARE last_inserted_id INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
            ROLLBACK;
        END;

    START TRANSACTION;

    INSERT INTO tbl_role (roleName, permission, roleStatus)
    VALUES (p_roleName, p_permission, p_roleStatus);

    SET @InsertedID = LAST_INSERT_ID();
    CALL role_get(@InsertedID);
    COMMIT;

END;