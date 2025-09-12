CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE
  IF NOT EXISTS public.users (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(70) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now (),
    updated_at timestamp without time zone NOT NULL DEFAULT now (),
    deleted_at timestamp without time zone,
    CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY (id)
  );

ALTER TABLE IF EXISTS public.users OWNER to root;

CREATE TABLE
  IF NOT EXISTS public.products (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    userId character varying(100) COLLATE pg_catalog."default" NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    value NUMERIC(10,2) NOT NULL,
    amount integer NOT NULL,
    description character varying(255) COLLATE pg_catalog."default" NOT NULL,
    category character varying(100) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now (),
    updated_at timestamp without time zone NOT NULL DEFAULT now (),
    deleted_at timestamp without time zone,
    CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY (id)
  );
ALTER TABLE IF EXISTS public.products OWNER to root;
CREATE TABLE
  IF NOT EXISTS public.product_features (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "productId" UUID,
    CONSTRAINT "PK_132816ff55e30a6bf554c9e2545" PRIMARY KEY (id),
    CONSTRAINT "FK_67339e59ab4b3ed091cf318f426" FOREIGN KEY ("productId") REFERENCES public.products (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
  );
ALTER TABLE IF EXISTS public.product_features OWNER to root;
CREATE TABLE
  IF NOT EXISTS public.product_images (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    url character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "productId" UUID,
    CONSTRAINT "PK_d1cf326e8d58dbc469bd7fe2f32" PRIMARY KEY (id),
    CONSTRAINT "FK_eb1531605709dd94ec67b2141d0" FOREIGN KEY ("productId") REFERENCES public.products (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
  );
ALTER TABLE IF EXISTS public.product_images OWNER to root;