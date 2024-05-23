DROP PROCEDURE IF EXISTS `accident_detection_DB`.`device_getAll`;
CREATE PROCEDURE `accident_detection_DB`.`device_getAll`(
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
END;

START TRANSACTION;

SELECT td.id                        AS id,
       td.deviceId                  AS deviceCode,
       td.type                      AS type,
       td.deviceStatus              AS status,
       (SELECT JSON_OBJECT('id', tv.id, 'vehicleNumber', tv.vehicleNumber, 'manufactureYear',
                           tv.manufactureYear, 'vehicleType', tv.vehicleType, 'model', tv.model, 'createdAt',
                           tv.createdAt)
        FROM tbl_vehicle tv
        WHERE tv.id = td.vehicleId) AS vehicle,
       (SELECT JSON_OBJECT('id', tu.id,
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
                           'userStatus', tu.userStatus,
                           'role_id', tu.role_id,
                           'emergencyPersonId', tu.emergencyPersonId,
                           'notificationId', tu.notificationId)
        FROM tbl_user tu
        WHERE tu.id = td.vehicleId) AS user

FROM tbl_device td;
    COMMIT;

END;
