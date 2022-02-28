INSERT INTO INFO_CONTACTO (NUM_DOCUMENTO , CELULAR , EMAIL , IDDEPARTAMENTO , IDGRUPOETNICO , IDMUNICIPIO , IDSEXO , IDTIPO , NOMBRERAZON , TELEFONO , TIPODOCUMENTO , VEREDA, DIRECCION ) VALUES ('1', '35037695', 'juan@htmail.com', 'Antioquia', 'Indígena', 'Medellín', 'Masculino','Propietario', 'razonnombre', '2272626', 'CC', 'vereda', 'CR12');
INSERT INTO INFO_CONTACTO (NUM_DOCUMENTO , CELULAR , EMAIL , IDDEPARTAMENTO , IDGRUPOETNICO , IDMUNICIPIO , IDSEXO , IDTIPO , NOMBRERAZON , TELEFONO , TIPODOCUMENTO , VEREDA, DIRECCION ) VALUES ('2', '35037695', 'juan@htmail.com', 'Antioquia', 'Indígena', 'Medellín', 'Masculino','permanente', 'razonnombre', '2272626', 'CC', 'vereda', 'CR12');
INSERT INTO INFO_CONTACTO (NUM_DOCUMENTO , CELULAR , EMAIL , IDDEPARTAMENTO , IDGRUPOETNICO , IDMUNICIPIO , IDSEXO , IDTIPO , NOMBRERAZON , TELEFONO , TIPODOCUMENTO , VEREDA, DIRECCION ) VALUES ('3', '35037695', 'juan@htmail.com', 'Antioquia', 'Indígena', 'Medellín', 'Masculino','Poseedor u ocupante', 'razonnombre', '2272626', 'CC', 'vereda', 'CR12');
INSERT INTO PREDIO (ID_PREDIO,ARRIENDOVENTA ,CODIGONUPRE ,DEPARTAMENTO ,DESTINOECONOMICO ,FECHAOFERTA ,FOLIOMATRICULA ,MUNICIPIO ,NUMPREDIAL ,VALOR ,VALORMINIMO ,VEREDA ,INFO_CONTACTO_NUM_DOCUMENTO ) VALUES (1, 'Venta',  '1927', 'Antioquia', 'Agropecuario', '2020/01/01', 'FOLIO', 'Medellin', '1', 2000, 10000, 'veredad', '1');
INSERT INTO PREDIO (ID_PREDIO,ARRIENDOVENTA ,CODIGONUPRE ,DEPARTAMENTO ,DESTINOECONOMICO ,FECHAOFERTA ,FOLIOMATRICULA ,MUNICIPIO ,NUMPREDIAL ,VALOR ,VALORMINIMO ,VEREDA ,INFO_CONTACTO_NUM_DOCUMENTO ) VALUES (2, 'Arriendo',  '8', 'Antioquia', 'Comercial', '2020/01/01', 'FOLIO', 'Medellin', '2', 2000, 10000, 'veredad', '1');
INSERT INTO PREDIO (ID_PREDIO,ARRIENDOVENTA ,CODIGONUPRE ,DEPARTAMENTO ,DESTINOECONOMICO ,FECHAOFERTA ,FOLIOMATRICULA ,MUNICIPIO ,NUMPREDIAL ,VALOR ,VALORMINIMO ,VEREDA ,INFO_CONTACTO_NUM_DOCUMENTO ) VALUES (3, 'Arriendo',  '9', 'Antioquia', 'Industrial', '2020/01/01', 'FOLIO', 'Medellin', '3', 2000, 10000, 'veredad', '1');
INSERT INTO DIRECCION_PREDIO  (ID ,DIRECCION ,PREDIO_ID_PREDIO ) VALUES (2, 'CARRERA 22', 1);
INSERT INTO DIRECCION_PREDIO  (ID ,DIRECCION ,PREDIO_ID_PREDIO ) VALUES (3, 'CARRERA 23', 1);
INSERT INTO DIRECCION_PREDIO  (ID ,DIRECCION ,PREDIO_ID_PREDIO ) VALUES (4, 'CARRERA 24', 1);
INSERT INTO DIRECCION_PREDIO  (ID ,DIRECCION ,PREDIO_ID_PREDIO ) VALUES (1, 'CARRERA 21', 1);