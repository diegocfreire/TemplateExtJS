-- Table: public.usuar

-- DROP TABLE public.usuar;

CREATE TABLE public.usuar
(
    des_nome character varying(150) COLLATE pg_catalog."default" NOT NULL,
    des_user character varying(80) COLLATE pg_catalog."default" NOT NULL,
    des_senha character varying(60) COLLATE pg_catalog."default" NOT NULL,
    des_acesso character varying(45) COLLATE pg_catalog."default" NOT NULL,
    flg_ativo boolean NOT NULL DEFAULT true,
    CONSTRAINT usuar_pkey PRIMARY KEY (des_user)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.usuar
    OWNER to postgres;
    
    
    
    
    
    
INSERT INTO public.usuar(
	des_nome, des_user, des_senha, des_acesso, flg_ativo)
	VALUES ('usuario', 'usuario', '202cb962ac59075b964b07152d234b70', 'ROLE_ADM', true);    
