--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-01-24 13:00:06

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 24576)
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    published_year integer NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    isbn character varying(13) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.books OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24601)
-- Name: borrowings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.borrowings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    book_id uuid,
    member_id uuid,
    borrow_date date NOT NULL,
    return_date date,
    status character varying(10) DEFAULT 'BORROWED'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.borrowings OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24589)
-- Name: members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.members (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(15) NOT NULL,
    address text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.members OWNER TO postgres;

--
-- TOC entry 4660 (class 2606 OID 24588)
-- Name: books books_isbn_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_isbn_key UNIQUE (isbn);


--
-- TOC entry 4662 (class 2606 OID 24586)
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- TOC entry 4668 (class 2606 OID 24609)
-- Name: borrowings borrowings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrowings
    ADD CONSTRAINT borrowings_pkey PRIMARY KEY (id);


--
-- TOC entry 4664 (class 2606 OID 24600)
-- Name: members members_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_email_key UNIQUE (email);


--
-- TOC entry 4666 (class 2606 OID 24598)
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- TOC entry 4669 (class 2606 OID 24610)
-- Name: borrowings borrowings_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrowings
    ADD CONSTRAINT borrowings_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- TOC entry 4670 (class 2606 OID 24615)
-- Name: borrowings borrowings_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrowings
    ADD CONSTRAINT borrowings_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.members(id);


-- Completed on 2025-01-24 13:00:07

--
-- PostgreSQL database dump complete
--

