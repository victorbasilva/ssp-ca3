<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:template match="/">
		<table id="menuTable" border="0" class="table table-dark">
			<thead>
				<tr>
					<th>Select</th>
					<th>Game</th>
                    <th>Platform</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				<xsl:for-each select="//genre">
					<tr>
						<td colspan="4">
							<h4 class="px-2 bg-dark">
								<xsl:value-of select="@name" />
							</h4>
						</td>
					</tr>
					<xsl:for-each select="game">
						<tr id="{position()}">
							<td align="center" name="isSelected">
								<input name="game{position()}" type="checkbox" class="form-check-input" id="game{position()}" data-position="{position()}" data-genre="{../@name}"/>
							</td>
                            <td name="game">
								<label class="form-check-label" for="game{position()}" role="button">
									<xsl:value-of select="name" />
								</label>
							</td>
							<td name="platform">
								<xsl:value-of select="platforms"/>
							</td>
							<td align="left" name="price">
								<xsl:value-of select="price" role="button" />
							</td>
						</tr>
					</xsl:for-each>
				</xsl:for-each>
			</tbody>
		</table>
	</xsl:template>
</xsl:transform>