DROP PROCEDURE IF EXISTS `accident_detection_DB`.`notification_get`;
CREATE PROCEDURE `accident_detection_DB`.`notification_get`(
    IN id_val INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        END;

    START TRANSACTION;

    SELECT tn.id       AS notificationId,
           tn.type     AS notificationType,
           tn.message  AS notificationMessage,
           tn.location AS notificationLocation,
           tn.time     AS notificationTime,
           JSON_OBJECT(
                   'userId', tu.id,
                   'userName', tu.userName,
                   'fullName', tu.fullName,
                   'nic', tu.nic,
                   'contactNumber', tu.contactNumber,
                   'email', tu.email,
                   'gender', tu.gender,
                   'address', tu.address,
                   'city', tu.city,
                   'district', tu.district,
                   'province', tu.province,
                   'role_id', tu.role_id,
                   'vehicleId', tu.vehicleId,
                   'deviceId', tu.deviceId,
                   'emergencyPersonId', tu.emergencyPersonId
           )           AS user
    FROM tbl_notification tn
             LEFT JOIN tbl_user tu ON tn.notificationId = tu.id
    WHERE tn.id = id_val;
    COMMIT;
END