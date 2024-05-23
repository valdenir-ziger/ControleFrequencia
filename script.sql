CREATE SEQUENCE pessoa_id_seq;
CREATE SEQUENCE evento_id_seq;
CREATE SEQUENCE atividade_id_seq;
CREATE SEQUENCE certificado_id_seq;

CREATE TABLE pessoa(
    cod_pessoa integer NOT NULL DEFAULT nextval('pessoa_id_seq'),
    administrador boolean,
    professor boolean,
    vinculo_utfpr boolean,
    cpf_pessoa text,
    senha_pessoa text,
    email_pessoa text,
    telefone_pessoa text,
    ra_pessoa text,
    nome_pessoa text,
    CONSTRAINT pessoa_pkey PRIMARY KEY (cod_pessoa)
);

CREATE TABLE evento(
    cod_evento integer NOT NULL DEFAULT nextval('evento_id_seq'),
    nome_evento text,
    ano_evento text,
    cidade_evento text,
    data_inicio date,
    imagem_evento text,
    CONSTRAINT evento_pkey PRIMARY KEY (cod_evento)
);

CREATE TABLE atividade(
    cod_atividade integer NOT NULL DEFAULT nextval('atividade_id_seq'),
    nome_atividade text,
    carga_horaria numeric,
    cod_evento integer,
    data_atividade date,
    hora_inicio time,
    hora_final time,
    CONSTRAINT atividade_pkey PRIMARY KEY (cod_atividade),
    CONSTRAINT atividade_evento_fk FOREIGN KEY (cod_evento)
      REFERENCES evento (cod_evento) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE certificado(
    cod_certificado integer NOT NULL DEFAULT nextval('certificado_id_seq'),
    cod_evento integer NOT NULL,
    cod_pessoa integer NOT NULL,
    texto_certificado text,
    tipo_certificado text,
    CONSTRAINT certificado_pkey PRIMARY KEY (cod_certificado),
    CONSTRAINT certificado_evento_fk FOREIGN KEY (cod_evento)
      REFERENCES evento (cod_evento) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT certificado_pessoa_fk FOREIGN KEY (cod_pessoa)
      REFERENCES pessoa (cod_pessoa) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE responsavel(
    cod_atividade integer NOT NULL,
    cod_pessoa integer NOT NULL,
    CONSTRAINT responsavel_pkey PRIMARY KEY (cod_atividade, cod_pessoa),
    CONSTRAINT responsavel_atividade_fk FOREIGN KEY (cod_atividade)
      REFERENCES atividade (cod_atividade) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT responsavel_pessoa_fk FOREIGN KEY (cod_pessoa)
      REFERENCES pessoa (cod_pessoa) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE participacao(
    cod_atividade integer NOT NULL,
    cod_pessoa integer NOT NULL,
    inscricao boolean,
    participacao boolean,
    CONSTRAINT participacao_pkey PRIMARY KEY (cod_atividade, cod_pessoa),
    CONSTRAINT participacao_atividade_fk FOREIGN KEY (cod_atividade)
      REFERENCES atividade (cod_atividade) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT participacao_pessoa_fk FOREIGN KEY (cod_pessoa)
      REFERENCES pessoa (cod_pessoa) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

INSERT INTO pessoa(administrador, professor    , vinculo_utfpr  , cpf_pessoa, 
                   senha_pessoa , email_pessoa , telefone_pessoa, ra_pessoa, nome_pessoa)
            VALUES(true, false, true, '05346519920', 
                   'admin', 'valdenir.ziger@hotmail.com', '(46) 99973-5175', '2095637', 'Deno');

INSERT INTO pessoa(administrador, professor    , vinculo_utfpr  , cpf_pessoa, 
                   senha_pessoa , email_pessoa , telefone_pessoa, ra_pessoa, nome_pessoa)
            VALUES(false, false, true, '00000000001', 
                   'responsável1', 'responsável_1@hotmail.com', '(00) 00000-0000', '0000001', 'Responsável 1');

INSERT INTO pessoa(administrador, professor    , vinculo_utfpr  , cpf_pessoa, 
                   senha_pessoa , email_pessoa , telefone_pessoa, ra_pessoa, nome_pessoa)
            VALUES(false, false, true, '00000000002', 
                   'responsável2', 'responsável_2@hotmail.com', '(00) 00000-0000', '0000002', 'Responsável 2');

INSERT INTO pessoa(administrador, professor    , vinculo_utfpr  , cpf_pessoa, 
                   senha_pessoa , email_pessoa , telefone_pessoa, ra_pessoa, nome_pessoa)
            VALUES(false, true, true, '00000000003', 
                   'professor1', 'professor_1@hotmail.com', '(00) 00000-0000', '0000003', 'Professor 1');



