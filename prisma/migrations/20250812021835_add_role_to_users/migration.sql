-- Cria o tipo ENUM "Role" no schema "public" APENAS SE ele ainda não existir.
-- Esta é a maneira mais segura e idempotente de fazer isso no PostgreSQL.
DO $$
BEGIN
    IF to_regtype('public."Role"') IS NULL THEN
        CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'MEMBER');
    END IF;
END$$;

-- Adiciona a coluna na tabela "users".
-- A correção crucial está aqui: especificamos "public"."Role" explicitamente.
-- Isso diz ao PostgreSQL exatamente onde encontrar o tipo, ignorando
-- qualquer ambiguidade do search_path na transação atual.
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" public."Role" NOT NULL DEFAULT 'MEMBER';