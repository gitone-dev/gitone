/*
 * Copyright (C) 2009-2010, Google Inc. and others
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Distribution License v. 1.0 which is available at
 * https://www.eclipse.org/org/documents/edl-v10.php.
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

package dev.gitone.jgit.http.server;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import org.eclipse.jgit.internal.storage.file.ObjectDirectory;
import org.eclipse.jgit.lib.Repository;

import java.io.IOException;

import static dev.gitone.jgit.http.server.ServletUtils.getRepository;
import static jakarta.servlet.http.HttpServletResponse.SC_FORBIDDEN;

/**
 * Requires the target {@link Repository} to be available via local filesystem.
 * <p>
 * The target {@link Repository} must be using a {@link ObjectDirectory}, so the
 * downstream servlet can directly access its contents on disk.
 */
class IsLocalFilter implements Filter {
	@Override
	public void init(FilterConfig config) throws ServletException {
		// Do nothing.
	}

	@Override
	public void destroy() {
		// Do nothing.
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		if (isLocal(getRepository(request)))
			chain.doFilter(request, response);
		else
			((HttpServletResponse) response).sendError(SC_FORBIDDEN);
	}

	private static boolean isLocal(Repository db) {
		return db.getObjectDatabase() instanceof ObjectDirectory;
	}
}
